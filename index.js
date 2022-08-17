const express = require("express")
const axios = require("axios").default
const cors = require("cors")
const app = express()
require("dotenv").config()
var sent = false;

app.use(cors())

app.get("/", (req, res)=>{
    axios.get('https://shopee.com.br/api/v4/recommend/recommend?bundle=shop_page_product_tab_main&limit=999&offset=0&section=shop_page_product_tab_main_sec&shopid=377206033')
        .then((response)=>{
            if(response.data['data']['sections'][0]['total'] > 0){
                if(sent == false){
                    sent = true;
                    axios.post(
                        'https://onesignal.com/api/v1/notifications',
                        // '\n{\n     "included_segments": [\n          "Subscribed Users"\n     ],\n     "contents": {\n          "en": "English or Any Language Message",\n          "es": "Spanish Message"\n     },\n     "name": "INTERNAL_CAMPAIGN_NAME"\n}\n',
                        {
                            'included_segments': [
                                'Subscribed Users'
                            ],
                            'contents': {
                                'en': 'A PEITA SAIU! CLIQUE PARA ABRIR A SHOPEE',
                            },
                            'url': 'https://shopee.com.br/product/377206033/8286150621/',
                            'app_id':'cf17619d-b4d5-4639-af55-8c41a8c378a3'
                        },
                        {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': `Basic ${process.env['APIKEY']}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then(res=>console.log(res));                    
                }
                res.send({peitasaiu:true,by:"@brokeboienige"})
            } else
                res.send({peitasaiu:false,by:"@brokeboienige"})
        })
})

app.listen(80, ()=>{
    console.log("rodando na porta 80")
})