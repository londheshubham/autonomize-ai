import express from 'express';
import  * as middleWare from './middlewares/middlewares.js';
const app = express();

app.use(express.json());
app.get('/api/employees', middleWare.getAllEmployees);
app.get('/api/employees/:id', middleWare.getEmployee);
app.post('/api/employees', middleWare.createEmployee);
app.put('/api/employees/:id',middleWare.updateEmployee);
app.delete('/api/employees/:id',middleWare.deleteEmployee)

app.listen(3000,()=>{
    console.log('Server running successfully on port 3000');
})