import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/menu.style';
import ModalConfirmacao from '../components/Modals/ModalConfirmacao'; // Importação do ModalConfirmacao
import { supabase } from '../utils/supabase'; // Importação do supabase
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import ModalRelatorio from '../components/Modals/ModalRelatorio';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); 

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [reportModalVisible, setReportModalVisible] = useState(false); // Estado para controlar a visibilidade do modal de relatório
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário

  useEffect(() => {
    const fetchUserSession = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { nome } = JSON.parse(userSession);
        setUserName(nome);
      }
    };
    fetchUserSession();
  }, []);

  if (!fontsLoad) {
    return undefined;
  }
  
  const handleLogout = () => {
    setModalVisible(true); // Abre o modal
  };

  const confirmLogout = async () => {
    setModalVisible(false); // Fecha o modal
    await AsyncStorage.removeItem('userSession');
    router.replace("/");
  };

  const handleGenerateReport = () => {
    setReportModalVisible(true); // Abre o modal de relatório
  };

  const confirmGenerateReport = async () => {
    setReportModalVisible(false); // Fecha o modal de relatório
    await generateReport();
  };

  const generateReport = async () => {
    const userSession = JSON.parse(await AsyncStorage.getItem('userSession'));
    const cpfHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, userSession.cpf);
    
    const { data: denuncias, error } = await supabase
      .from('denuncias')
      .select(`
        *,
        denuncias_status (
          *,
          status_denuncia (descricao_status)
        )
      `)
      .or(`usuario_cpf.eq.${userSession.cpf}, cpf_hash.eq.${cpfHash}`)
      .gte('data_denuncia', new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString())
      .order('data_denuncia', { ascending: false });
  
    if (error) {
      console.error(error);
      return;
    }
  
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const formattedDateTime = currentDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const fileName = `Relatório_de_Denúncias_${formattedDate}.pdf`;
  
    const denunciasPerPage = 3;
    const totalPages = Math.ceil(denuncias.length / denunciasPerPage);
  
    let htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Poppins-Light'; }
            .header { text-align: center; margin-top: 20px; margin-bottom: 10px; }
            .header img { width: 100px; margin-bottom: 10px; }
            .header h1 { margin: 0; margin-bottom: 5px; }
            .header h4 { margin: 0; font-size: 16px; margin-bottom: 26px; }
            .denuncia { margin-bottom: 10px; margin-left: 12px; }
            .denuncia p { margin: 5px; }
            .separator { border-top: 1px solid #000; margin: 10px 0; }
            .page-break { page-break-after: always; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://i.ibb.co/nMZR9FR/logo.png" alt="Logo" />
            <h1>D.A.P.S.</h1>
            <h2>Denúncia Anônima de Perturbação de Sossego</h2>
            <p>Relatório de denúncias gerado em ${formattedDateTime}</p>
          </div>
    `;
  
    for (let page = 0; page < totalPages; page++) {
      const start = page * denunciasPerPage;
      const end = start + denunciasPerPage;
      const pageDenuncias = denuncias.slice(start, end);
  
      htmlContent += pageDenuncias.map(denuncia => `
        <div class="denuncia">
          <p><strong>Protocolo:</strong> ${denuncia.id}</p>
          <p><strong>Anônimo:</strong> ${denuncia.anonimo ? 'Sim' : 'Não'}</p>
          <p><strong>Local:</strong> ${denuncia.rua}, ${denuncia.numero} - ${denuncia.cep}</p>
          <p><strong>Complemento:</strong> ${denuncia.complemento || 'Sem complemento'}</p>
          <p><strong>Descrição:</strong> ${denuncia.descricao}</p>
          <p><strong>Data da Denúncia:</strong> ${new Date(denuncia.data_denuncia).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <p><strong>Status:</strong> ${denuncia.denuncias_status[0].status_denuncia.descricao_status}</p>
          <p><strong>Motivo Cancelamento:</strong> ${denuncia.motivo_cancelamento || 'Não foi Cancelada.'}</p>
          <p><strong>Decibéis registrado na hora da denúncia:</strong> ${denuncia.decibeis !== null ? denuncia.decibeis : 'Não captado'}</p>
        </div>
        <div class="separator"></div>
      `).join('');
  
      if (page < totalPages - 1) {
        htmlContent += '<div class="page-break"></div>';
      }
    }
  
    htmlContent += `
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        fileName: fileName,
      });
  
      await shareAsync(uri);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>D.A.P.S.</Text>
      {userName ? <Text style={styles.welcomeText}>Olá, {userName}!</Text> : null}

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuOption} 
          onPress={() => router.navigate('/novadenuncia')}
        >
          <Feather name="file-plus" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Nova Denúncia</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.menuOption}
         onPress={() => router.navigate('/consultadenuncias')}>
          <Feather name="search" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Consultar Denúncias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuOption} onPress={handleGenerateReport}>
          <Feather name="bar-chart-2" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Gerar Relatório</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuOption} onPress={() => router.navigate('/decibelimetro')}>
          <Feather name="mic" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Decibelímetro</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout na parte inferior */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Feather name="log-out" size={RFValue(20)} color="#000000" />
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>

      {/* Modal de Confirmação de Logout */}
      <ModalConfirmacao
        visible={modalVisible}
        message="Tem certeza que deseja sair?"
        onClose={() => setModalVisible(false)}
        onConfirm={confirmLogout}
      />

      {/* Modal de Confirmação de Geração de Relatório */}
      <ModalRelatorio
        visible={reportModalVisible}
        message="Deseja gerar um relatório com as denúncias dos últimos 12 meses?"
        onClose={() => setReportModalVisible(false)}
        onConfirm={confirmGenerateReport}
      />
    </View>
  );
}