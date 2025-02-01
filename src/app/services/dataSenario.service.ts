import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Scenario {
  id: number;
  titre: string;
  description: string;
  imgUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'http://127.0.0.1:8080/api/v1/chat/promptmodels';

  async getData(): Promise<Scenario[]> {
    return axios.get<Scenario[]>(this.apiURL).then((r) => r.data);
  }

  async deleteData(id: number): Promise<void> {
    return axios.delete('http://127.0.0.1:8080/api/v1/chat/delete', {
      data: { id },
    });
  }
}
