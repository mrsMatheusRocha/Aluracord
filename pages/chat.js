import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaG11em5nbXB4cHdneG16YnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MzkwMTAsImV4cCI6MjA1NTMxNTAxMH0.BuUGKXrsGjKCYzeyvuYKEwhX80qGZ5UIcJ1HIh7-dQc';
const SUPABASE_URL = 'https://tohmuzngmpxpwgxmzbyi.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function mensagensTempoReal(adicionaMensagem) {
  const channel = supabaseClient
    .channel('mensagens')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensagens' }, (payload) => {
      adicionaMensagem(payload.new);
    })
    .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
      supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({data}) => {
          setListaDeMensagens(data)
        })
      
      mensagensTempoReal((novaMensagem) => {
        setListaDeMensagens((valorAtualLista) => {
          return [
            novaMensagem, 
            ...valorAtualLista,
          ]
        });
      });
    }, []);

    function handleNovaMensagem(novaMensagem) {

          const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
          };
          supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({ data }) => {
            });
          setMensagem('');
    }
    

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/V4jfrek9rzhJuCYhEGivW/057a4bd71bc6986d6fdc9f161623bc1a/header.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens}/>

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'start',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) =>{
                              const valor = event.target.value;
                              setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                              }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            handleNovaMensagem(mensagem);
                          }}
                          styleSheet={{
                            height: '45.06px',
                            marginRight: '12px'
                          }}
                          type='submit'
                          label='Enviar'
                          buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[500],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600]
                          }}
                        />
                        <ButtonSendSticker
                          onStickerClick={(sticker) => {
                            handleNovaMensagem(sticker);
                          }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
  const [showProfileInfo, setShowProfileInfo] = React.useState(null);

  const toggleProfileInfo = (mensagemId) => {
    if (showProfileInfo === mensagemId) {
      setShowProfileInfo(null); 
    } else {
      setShowProfileInfo(mensagemId);
    }
  };

  return (
      <Box
          tag="ul"
          styleSheet={{
              overflow: 'scroll',
              display: 'flex',
              flexDirection: 'column-reverse',
              flex: 1,
              color: appConfig.theme.colors.neutrals["000"],
              marginBottom: '16px',
          }}
      >
          {props.mensagens.map((mensagem) => {
                return (
                  <Text
                    key={mensagem.id}
                    className="mensagem"
                    tag="li"
                    styleSheet={{
                      borderRadius: '5px',
                      padding: '6px',
                      marginBottom: '12px',
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                      }, 
                    }}
                  >
                    <Box
                      styleSheet={{
                        display: 'flex',
                        alignItems: 'end',
                        marginBottom: '8px',
                        gap: '0.2rem'
                      }}
                    >
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Image
                        onClick={(event) => toggleProfileInfo(mensagem.id, event)}
                        className = {'fotoPerfil'}
                        styleSheet={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'inline-block',
                          marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                      />
                      {showProfileInfo === mensagem.id && ( 
                        <div
                          style={{
                            position: 'absolute',
                            bottom: props.mensagens[0].id === mensagem.id ? '0' : 'auto', 
                            top: props.mensagens[0].id === mensagem.id ? 'auto' : '0', 
                            left: '50px', 
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                            zIndex: 1,
                            minWidth: '500px',
                          }}
                        >
                          <div
                            style={{
                              backgroundImage:`url(https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/V4jfrek9rzhJuCYhEGivW/057a4bd71bc6986d6fdc9f161623bc1a/header.jpg)`,
                              backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundBlendMode: 'multiply',
                              borderRadius: '10px 10px 0px 0px',
                              padding: '10px 0px 0px 10px',
                              marginBottom: '10px'
                            }}
                          >
                            <Image
                              onClick={(event) => toggleProfileInfo(mensagem.id,event)}
                              styleSheet={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                              }}
                              src={`https://github.com/${mensagem.de}.png`}
                            />
                          </div>
                          <Text style={{textAlign: 'center'}}>Informações do Perfil</Text>
                          <Text>{mensagem.de}</Text>
                        </div>
                      )}
                      </div>
                      <Text tag="strong">
                        {mensagem.de}
                      </Text>
                      <Text
                        styleSheet={{
                          fontSize: '10px',
                          marginLeft: '8px',
                          color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                      >
                        {(new Date().toLocaleDateString())}
                      </Text>
                    </Box>
                    {mensagem.texto.startsWith('https:') 
                    ? (
                      <Image src={mensagem.texto.replace('https:', '')} />
                    )
                    : (
                      mensagem.texto
                    )}
                  </Text>
                );
          })}
      </Box>
  )
}