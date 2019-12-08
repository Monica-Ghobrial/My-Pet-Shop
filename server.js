const { google } = require('googleapis');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Ads = require('./server/api/ads')
const Questions = require('./server/api/questions')
const User = require('./server/api/regUser')
const Photos = require('googlephotos');
const OAuth2Data = require('./server/google_keys.json')

const UserContollers = require('./server/Controllers/UserControllers')

const routes = require('./server/routes.js')
const request = require('request');
////////////////////////////////////////////
// const persist = require('node-persist');
// //const expressWinston = require('express-winston');
// const http = require('http');
// const request = require('request-promise');
// const session = require('express-session');
// const sessionFileStore = require('session-file-store');
// const uuid = require('uuid');
// const winston = require('winston');



// //const fileStore = sessionFileStore(session);
// const server = http.Server(app);
const app = express()
/////////////////////////////////////////////////////
const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const REDIRECT_URL = OAuth2Data.client.redirect
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

const scopes = [
   //   'https://www.googleapis.com/auth/photoslibrary',

      'https://www.googleapis.com/auth/photoslibrary.readonly',
  'profile',

];
// bodyParser = {
//     json: {limit: '50mb', extended: true},
//     urlencoded: {limit: '50mb', extended: true}
//   };
app.use(bodyParser.json({limit: '50mb', extended: true}))


app.get('/upload', async (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        console.log(url)
        res.redirect(url);
    } else {
        console.log('dah token', oAuth2Client.getAccessToken())

        const options = {
            url: 'https://photoslibrary.googleapis.com/v1/albums',
            method: 'GET',
            
         //   auth: OAuth2Data.credentials.refresh_token,
            auth: { bearer:'ya29.Il-zB5bEBoPWaTQRGHoV81Bh-mvNDg1B1nP5_6m6N4XATcknl3WWBHMRQkEUT-JSop089ztGjRziY9SMGnujVDC3Kg2eHNLzAgNuUTUmuUL982mF4Pg13k2FiKK1MBsphA' },
            pageSize: '20',
          //  json:true,
           // scope: scopes,
       //     qs:{pageSize:20},
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': oAuth2Client.getAccessToken()
           // scope: scopes
                }

        }
        
        try {

           
            request.get(options, function (err, res) {
                console.log('dah error', err);
                console.log(res.body);
                console.log('hwhhhh')
             
            });

            res.send('Logged in')


        }



        catch (error) {
            console.log(error)
        }











        //const gphotos= google.photoslibrary({version:'v1', auth: oAuth2Client})
        //====  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        // const photos= new Photos(oAuth2Client)


        //     const res= await photos.albums.get();
        //   //const response = await photos.albums.create('1st test');
        //   console.log('done');
        // //   res.forEach((res) => {
        // //  console.log(`- ${res.id}`);
        // //   }

        //     catch(error){
        //    console.log(error)
        //     }



        // }




    }
})

// app.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy();
//     res.redirect('/');
//   });


app.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                console.log(tokens)
                authed = true;
                res.redirect('/upload')
            }
        });
    }
});

///photo library test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const mediaItemCache = persist.create({
//     dir: 'persist-mediaitemcache/',
//     ttl: 3300000,  // 55 minutes
//   });
//   mediaItemCache.init();


//   const storage = persist.create({dir: 'persist-storage/'});
// storage.init();


// const sessionMiddleware = session({
//     resave: true,
//     saveUninitialized: true,
//     store: new fileStore({}),
//     secret: 'photo frame sample',
//   });


//   const consoleTransport = new winston.transports.Console();


//   const logger = winston.createLogger({
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.simple()
//     ),
//     transports: [
//       consoleTransport
//     ]
//   });

//   if (process.env.DEBUG) {
//     // Print all winston log levels.
//     logger.level = 'silly';


//     app.use(expressWinston.logger({
//         transports: [
//               consoleTransport
//             ],
//             winstonInstance: logger
//       }));
//         // Enable request debugging.
//   require('request-promise').debug = true;
// } else {
//   // By default, only print all 'verbose' log level messages or below.
//   logger.level = 'verbose';
// }

// //???????????
// // Set up static routes for hosted libraries.
// app.use(express.static('static'));
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/'));
// app.use(
//     '/fancybox',
//     express.static(__dirname + '/node_modules/@fancyapps/fancybox/dist/'));
// app.use(
//     '/mdlite',
//     express.static(__dirname + '/node_modules/material-design-lite/dist/'));



// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(sessionMiddleware);


// app.use((req, res, next) => {
//     res.locals.name = '-';
//     if (req.user && req.user.profile && req.user.profile.name) {
//       res.locals.name =
//           req.user.profile.name.givenName || req.user.profile.displayName;
//     }

//     res.locals.avatarUrl = '';
//   if (req.user && req.user.profile && req.user.profile.photos) {
//     res.locals.avatarUrl = req.user.profile.photos[0].value;
//   }
//   next();
// });


// app.get('/search', (req, res) => {
//     renderIfAuthenticated(req, res, 'pages/search');
//   });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


//   app.get('/album', (req, res) => {
//     renderIfAuthenticated(req, res, 'pages/album');
//   });   
///////////////////////////////////////////////////

const db = require('./config/keys').mongoURI
const dotenv = require('dotenv');
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongoose is connected xD ..."))
    .catch(err => console.log(err));

app.use('/api/ads', Ads)
app.use('/api/questions', Questions)
app.use('/api/user', User)
app.use('/', routes)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is run on port ${port}`))