import Axios from 'axios';

const host = 'https://iotplatform.xyz/api';

export default {
  get: {
    getValueByDeviceId: async (device_id: string, limit: number) => {
      const url = `${host}/humidity?device_id=${device_id}&limit=${limit}`;
      const {data} = await Axios.get(`${url}`);
      const result:HumidityDataType = data;
        
      return result;
    },

    getWelcomeMessage: async () =>{
        const url = "https://iotplatform.xyz/"
        const {data} = await Axios.get(`${url}`);
        const result:WelcomeMessage = data;
        
        return result;
    },

    getUserInformation: async() =>{
      const url = `${host}/user?ids=1,2,3,4,5`;
      const {data} = await Axios.get(`${url}`);
      const result:UserInformation[] = data;

      return result;
    }
  },
};


export interface HumidityDataType {
    name: string;
    data: number[];

}

export interface WelcomeMessage {
  Team: string;
  Message: string;
}

export interface UserInformation {
  name : string;
  username: string;
  email: string;
  phone: string;
  birthday: number;
}