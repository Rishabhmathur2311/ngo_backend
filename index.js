
import crypto from "crypto"
import axios from "axios"
import express from "express";
import Connection from "./database/db.js";
import Route from './route.js';
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv"



dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', Route);
Connection();



app.get("/", (req, res) => {
    res.send("server is running");
})

// const MERCHANT_ID = "PGTESTPAYUAT";
// const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
// const KEYINDEX = 1;
// const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
// const APP_BE_URL = "http://localhost:8000"; // our application
// let userId = "MUID123";

const merchant_id=process.env.MERCHANT_ID;
const salt_key=process.env.SALT_KEY;



app.post("/order", async (req, res) => {

    try {
        console.log(req.body)

        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8000/status/?id=${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
                console.log(response.data)

                return res.json(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }

})


app.post("/status", async (req, res) => {

    const merchantTransactionId = req.query.id
    const merchantId = merchant_id

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        // url: "https://api-preprod.phonepe.com/apis/pg-sandbox",
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async (response) => {
            if (response.data.success === true) {
                const url = `http://localhost:3000/success`
                return res.redirect(url)
            } else {
                const url = `http://localhost:3000/failure`
                return res.redirect(url)
            }
        })
        .catch((error) => {
            console.error(error);
        });

})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})