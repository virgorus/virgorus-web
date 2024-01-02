import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
    Link
  } from '@react-email/components';
  import * as React from 'react';
  
  interface Booking {
    fullName: string;
    tourDate: Date;
    pickupInfo: string;
    packageName: string;
    packageUrl: string;
    headline: string;
    remarks: string;
  }  
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const AdminResponse = ({
     fullName = 'Test', 
     tourDate = new Date('12/24/2023'), 
     pickupInfo = 'Pickup info', 
     packageName = 'Malapascua', 
     packageUrl = 'https://url.com', 
     headline = 'Your Booking is Confirmed',
     remarks = 'We look forward to providing you with a memorable and enjoyable experience. If there are any changes or updates to your booking, we will keep you informed. Thank you once again for choosing Virgorus. We can\'t wait to welcome you on board!'
  }: Booking) => {
    const formattedDate = new Intl.DateTimeFormat('en', {
      dateStyle: 'long',
    }).format(tourDate);
  
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img src='https://i.ibb.co/CBsp1wQ/virgorus-main-logo.png' width={100}/>
            </Section>
  
            <Section style={content}>
  
              <Row style={{ ...boxInfos, paddingBottom: '0' }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Hi {fullName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    { headline }
                  </Heading>
  
                  <Text style={paragraph}>
                    <b>Date: </b>
                    {formattedDate}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Package: </b>
                    {packageName}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Pickup Information: </b>
                    {pickupInfo}
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(0,0,0, 0.5)',
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    For any questions or concerns about your booking, contact us at virgorus.com
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    {remarks}
                  </Text>
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: '0' }}>
                <Column style={containerButton} colSpan={2}>
                <Link href={packageUrl}>
                  <Button style={button}> 
                        View Package Information    
                  </Button>
                  </Link>
                </Column>
              </Row>
            </Section>
  
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'rgb(0,0,0, 0.7)',
              }}
            >
              © 2023 | Virgorus Tours., Cebu City, Philippines,
              P.H. | www.virgorus.com
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default AdminResponse;

  const main = {
    backgroundColor: '#fff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: '30px 20px',
  };
  
  const containerButton = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };
  
  const button = {
    backgroundColor: '#432F2B',
    padding: '12px 30px',
    borderRadius: 3,
    color: '#FFF',
    fontWeight: 'bold',
    border: '1px solid rgb(0,0,0, 0.1)',
    cursor: 'pointer',
  };
  
  const content = {
    border: '1px solid rgb(0,0,0, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  };
  
  const boxInfos = {
    padding: '20px 40px',
  };
  
  const containerImageFooter = {
    padding: '45px 0 0 0',
  };
  
