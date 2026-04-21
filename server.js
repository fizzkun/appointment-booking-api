const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let appointments = [
  {
    id: 1,
    customerName: 'Juan Dela Cruz',
    service: 'Dental Checkup',
    date: '2026-04-30',
    time: '10:00 AM',
    status: 'Scheduled',
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Appointment Booking API is running' });
});

app.get('/appointments', (req, res) => {
  res.json(appointments);
});

app.get('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const appointment = appointments.find((item) => item.id === id);

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.json(appointment);
});

app.post('/appointments', (req, res) => {
  const { customerName, service, date, time, status } = req.body;

  if (!customerName || !service || !date || !time) {
    return res.status(400).json({
      message: 'customerName, service, date, and time are required',
    });
  }

  const newAppointment = {
    id: appointments.length ? appointments[appointments.length - 1].id + 1 : 1,
    customerName,
    service,
    date,
    time,
    status: status || 'Scheduled',
  };

  appointments.push(newAppointment);

  res.status(201).json(newAppointment);
});

app.put('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { customerName, service, date, time, status } = req.body;

  const index = appointments.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  appointments[index] = {
    ...appointments[index],
    customerName: customerName ?? appointments[index].customerName,
    service: service ?? appointments[index].service,
    date: date ?? appointments[index].date,
    time: time ?? appointments[index].time,
    status: status ?? appointments[index].status,
  };

  res.json(appointments[index]);
});

app.delete('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = appointments.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const deletedAppointment = appointments[index];
  appointments.splice(index, 1);

  res.json({
    message: 'Appointment deleted successfully',
    deletedAppointment,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
