import axios from 'axios';

const baseURL = import.meta.env.mode === 'development' ? 'http://localhost:3000/api' : '/api';