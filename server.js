const mongoose = require('mongoose');

try {
    mongoose.connect(
        //'mongodb://localhost:27017/complainsystem', 
    'mongodb+srv://root:ahad1234@mycluster.ruutg.mongodb.net/complainsystem?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connection was successful'));    
} catch (error) {
    console.log(error)
}
//mongoose.connect('mongodb://localhost:27017/complainsystem').then(console.log('Connection was successful'));
