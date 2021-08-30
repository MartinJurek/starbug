import axios from 'axios';
import config from './conf'

export default async function GetCards(id) {
    
    let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:inv="http://invitecrm.eu/">\
    <soapenv:Header/>\
        <soapenv:Body>\
            <GetCards xmlns="http://invitecrm.eu/">\
                <apiKEY>' + config.apiKEY + '</apiKEY>\
                <userID>' + id + '</userID>\
                <loyaltyProgramCode>MEALCARD</loyaltyProgramCode>\
            </GetCards>\
        </soapenv:Body>\
    </soapenv:Envelope>'

    try {
        const response = await axios.post('http://testapp.eklub.eu/ApiCallioGastro/loyalty.asmx', xmls, {
            headers: {
              'Content-Type': 'text/xml'    
            }
        })

        let result =JSON.stringify(response.data)
        return parse(result)

    } catch (err) {

        console.log(err.message);
        alert(err.message)
        return null;
    }
}; 

function parse(str){
    let strParse =  str.split('\/').join('');
    strParse = strParse.split('<Cards>')[1]
    let arrayParsed = strParse.split('<Card>')
    let arrayCards = []


    // "<ID>28488<ID><Number>970347******0131<Number><Status>Neaktívna na zbieranie odmien<Status>
    for (let i = 1; i < arrayParsed.length; i = i + 2) {
        let arr = {
            id: arrayParsed[i].split('<ID>')[1].split('<ID>')[0],
            number: arrayParsed[i].split('<Number>')[1].split('<Number>')[0],
            status: arrayParsed[i].split('<Status>')[1].split('<Status>')[0],
        }
        arrayCards.push(arr)
    }

    return arrayCards
}