import axios from 'axios';
import config from './conf'

export default async function UserValidation() {

    try {
        const response = await axios.post('http://testapp.eklub.eu/ApiCallioGastro/loyalty.asmx', xmls, {
            headers: {
              'Content-Type': 'text/xml'    
            }
        })

        let result =JSON.stringify(response.data)
        return result.split('UserID>')[1].split('</')[0]

    } catch (err) {

        console.log(err.message);
        alert(err.message)

        return null;
    }
}; 

let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inv="http://invitecrm.eu/">\
            <soapenv:Header/>\
                <soapenv:Body>\
                    <inv:UserValidation>\
                        <inv:apiKEY>' + config.apiKEY +'</inv:apiKEY>\
                        <!--Optional:-->\
                        <inv:userName>' + config.userName + '</inv:userName>\
                        <!--Optional:-->\
                        <inv:password>' + config.password + '</inv:password>\
                        <inv:loyaltyProgramCode>MEALCARD</inv:loyaltyProgramCode>\
                    </inv:UserValidation>\
                </soapenv:Body>\
            </soapenv:Envelope>'