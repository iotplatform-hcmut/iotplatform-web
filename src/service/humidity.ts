import Axios from 'axios';
import { stringify } from 'querystring';

const host = 'https://iotplatform.xyz/api';

export default {
  get: {
    getValueByDeviceId: async (device_id: string, limit: number) => {
      const url = `${host}/humidity?device_id=${device_id}&limit=${limit}`;
      const {data} = await Axios.get(`${url}`);
      const result:HumidityDataType = data;
        
      return result;
    },

    getUserInformation: async() =>{
      const url = `${host}/user?ids=1,2,3,4,5`;
      const {data} = await Axios.get(`${url}`);
      const result:UserInformation[] = data;

      return result;
    },

    getMotorInformation: async() =>{
      const url = `${host}/motor`;
      const {data} = await Axios.get(`${url}`);
      const result:MotorInformation[] = data;

      return result;
    }
  },
  post:{
    addMotor: async(id:string, position:string, description:string) =>{
      const url = `${host}/motor`;
      let motor = new FormData();
      motor.append("id",id)
      motor.append("position",position)
      motor.append("description",description)
      motor.append("state","0")
      motor.append("relay","0")
      
      const {data} = await Axios.post(url,motor);
      const result:ReturnMessage = data;
      
      return result;
    }
  },
  delete:{
    deleteMotor: async(id: string)=>{
      const url = `${host}/motor`;
      let motor = new FormData();
      motor.append("id", id)

      const {data} = await Axios.delete(url,{data:motor});
      const result:ReturnMessage = data;
      
      return result;
    }
  }
};


export interface HumidityDataType {
    name: string;
    data: number[];

}

export interface UserInformation {
  name : string;
  username: string;
  email: string;
  phone: string;
  birthday: number;
}

export interface MotorInformation {
  id : string;
  position: string;
  description: string;
  state: boolean;
  relay: number;
}

export interface ReturnMessage {
  status: string
}