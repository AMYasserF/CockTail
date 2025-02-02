import express from 'express'
import axios from 'axios'

const app = express();
const port = 3000;
const API_URL ='https://www.thecocktaildb.com/api/json/v1/1/random.php';
const API_Image_URL ='https://www.thecocktaildb.com/images/ingredients/gin-Medium.png';
const APIKEY ='1';

app.use(express.static('public'));
app.get('/',async (req,res)=>{
    try{
        const result = await axios.get(API_URL,{
            params:{
                apiKey: APIKEY
            }
        });
        
        res.render('index.ejs',{
            cocktail: result.data.drinks[0].strDrink,
            isAlcoholic: result.data.drinks[0].strAlcoholic,
            instructions: result.data.drinks[0].strInstructions,
            image: result.data.drinks[0].strDrinkThumb

        })
        
    }
    catch(error)
    {
        console.error(error.message);
        res.render('index.ejs',{cocktail: error.message})
    }
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})