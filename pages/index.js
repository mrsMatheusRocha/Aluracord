import { Box, Button, Text, TextField, Image} from '@skynexui/components';
import appConfig from '../config.json';
import React from "react";
import { useRouter } from "next/router";

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'end',
          backgroundImage: 'url(https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/V4jfrek9rzhJuCYhEGivW/057a4bd71bc6986d6fdc9f161623bc1a/header.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          fontFamily: '"Open Sans", sans-serif',
          paddingRight: '4rem',
          paddingTop: '11rem'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (evento) {
              evento.preventDefault();
              roteamento.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">Junte-se a irmandade!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['300'], fontFamily: '"Open Sans", sans-serif'}}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              className='fotoPerfil'
              styleSheet={{
                borderRadius: '30%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: '3px 10px',
                borderRadius: '1000px',
                fontFamily: '"Open Sans", sans-serif'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}