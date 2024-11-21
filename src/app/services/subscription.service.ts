import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public async subscribe(email: string): Promise<string> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('owner', '1');
    formData.append('project', 'tribebuddy');
    try {
      const result$ = this.http.post<string>(
        `${this.baseUrl}/email/add`,
        formData
      );
      const result = await firstValueFrom(result$);
      return result;
    } catch (error: unknown) {
      const typedError = error as HttpErrorResponse;
      if (typedError.error['errors']) throw typedError.error['errors'];
      return typedError.error['errors'];
    }
  }
}
