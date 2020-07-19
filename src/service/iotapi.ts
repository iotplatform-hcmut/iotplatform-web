import Axios from 'axios';

const host = 'https://iotplatform.xyz/api';

export default {
  get: {
    getValueByDeviceId: async (ids: string[], limit: number = 100, startTime: number = 0, endTime: number = 2147483647) => {
      const url = `${host}/mois?ids=${ids.join(',')}&limit=${limit}&start=${startTime}&end=${endTime}`;
      const { data } = await Axios.get(`${url}`);
      const result: HumidityDataType[] = data;

      return result;
    },

    getUserInformation: async () => {
      const url = `${host}/user?ids=1,2,3,4,5`;
      const { data } = await Axios.get(`${url}`);
      const result: UserInformation[] = data;

      return result;
    },

    getMotorInformation: async () => {
      const url = `${host}/motor`;
      const { data } = await Axios.get(`${url}`);
      const result: MotorInformation[] = data;

      return result;
    },

    getSensorInfomation: async () => {
      const url = `${host}/sensor`;
      const { data } = await Axios.get(`${url}`);
      const result: SensorInformation[] = data;

      return result;
    },

    getHistoryInfomation: async () => {
      const url = `${host}/motor/history`;
      const { data } = await Axios.get(`${url}`);
      const result: HistoryInformation[] = data;

      return result;
    },

    getAllHistory: async () => {
      const url = `${host}/motor/history`;
      const { data } = await Axios.get(`${url}`);
      const result: HistoryDataType[] = data;

      return result;
    },

    pushMQTT: async (ids: string[], state: number, value: number) => {
      const url = `${host}/motor/publish?ids=${ids.join(',')}&value=${value}&state=${state}`;
      const { data } = await Axios.get(`${url}`);
      const result: ReturnMessage = data;

      return result;
    },
  },
  post: {
    addMotor: async (id: string, position: string, description: string, state: boolean, relay: number) => {
      const url = `${host}/motor`;
      let motor = new FormData();
      motor.append("id", id)
      motor.append("position", position)
      motor.append("description", description)
      motor.append("state", `${state}`)
      motor.append("relay", `${relay}`)

      const { data } = await Axios.post(url, motor);
      const result: ReturnMessage = data;

      return result;
    },

  },
  delete: {
    deleteMotor: async (id: string) => {
      const url = `${host}/motor`;
      let motor = new FormData();
      motor.append("id", id)

      const { data } = await Axios.delete(url, { data: motor });
      const result: ReturnMessage = data;

      return result;
    }
  }
};


export interface HumidityDataType {
  name: string;
  data: number[];
}

export interface HistoryDataType {
  id: string;
  timestamp: number;
  value: number;
}

export interface UserInformation {
  name: string;
  username: string;
  email: string;
  phone: string;
  birthday: number;
}

export interface MotorInformation {
  id: string;
  position: string;
  description: string;
  state: boolean;
  relay: number;
  sth: number;
}

export interface SensorInformation {
  id: string;
  position: string;
  description: string;
  state: boolean;
  relay: number;
}

export interface HistoryInformation {
  id: string;
  timestamp: number;
  value: number;
}

export interface ReturnMessage {
  status: string
}