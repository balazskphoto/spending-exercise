import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:5001',
});

const successHandler = (result) => {
  if (result.status === 201) {
    toast.success("Created new resource", {
      position: 'top-right',
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  return Promise.resolve(result);
};

const errorHandler = (error) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode > 299) {
    toast.error(error.response?.data?.message ?? error.message, {
      position: 'top-right',
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  return Promise.reject(error);
};

api.interceptors.response.use(successHandler, (error) => errorHandler(error));

export default api;
