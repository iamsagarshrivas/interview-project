import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataProviderService {


  private _url: string = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  getFile(file_name): Observable<any> {
    return this.http.get<any>(`${this._url}/api/get-file/${file_name}`)
  }

  getAllTests():Observable<any>{
    return this.http.get<any>(`${this._url}/api/questions/all-tests`);
  }

  decodeToken(token): Observable<any> {
    console.log('dps token', token);

    return this.http.get<any>(this._url + '/api/authenticate',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    )
  }

  verifyOtp(otpValue, _id): Observable<any> {
    return this.http.post<any>(this._url + '/api/candidate/verify-otp', { otpValue, _id });

  }

  getNumOfQues():Observable<any>{
    return this.http.get<any>(`${this._url}/api/questions/get-number-of-questions`);
  }

  uploadResumeFile(file): Observable<any> {
    console.log(file);
    try {
      return this.http.post<any>(this._url + '/api/candidate/upload', file);
    }
    catch (e) {
      return e;
    }

  }
  generateTest(testCase): Observable<any> {
    return this.http.post<any>(`${this._url}/api/questions/test`, { testCase }, this.httpOptions);

  }

  getTestQues(test_id):Observable<any>{
    return this.http.get<any>(`${this._url}/api/questions/get-questions/${test_id}`,this.httpOptions)
  }

  addQuestions(questions): Observable<any> {
    return this.http.post<any>(`${this._url}/api/questions/add-questions`, { questions }, this.httpOptions);

  }

  // login
  login(user_id): Observable<any> {
    return this.http.post<any>(this._url + '/api/login', user_id, this.httpOptions);
  }

  socialLogin(data): Observable<any> {
    return this.http.post<any>(`${this._url}/api/socialLogin/${data.provider}`, data, this.httpOptions);
  }

  // getting the list of all candidates
  getCandidates(): Observable<any> {
    return this.http.get<any>(this._url + "/api/candidate");
  }

  getCandidateById(id): Observable<any> {
    return this.http.get<any>(this._url + '/api/candidate/' + id);
  }

  updateCandidate(id, candidate): Observable<any> {
    return this.http.post<any>(this._url + '/api/candidate/update-candidate', { _id: id, candidate }, this.httpOptions);
  }

  updateCandidateResult(_id, result): Observable<any> {
    return this.http.post<any>(this._url + '/api/interviewers/update-candidate-result', { _id, result }, this.httpOptions);
  }

  updateCandidateJob(_id, job_id): Observable<any> {
    return this.http.post<any>(this._url + '/api/candidate/update-candidate-job', { _id, job_id }, this.httpOptions);
  }

  // adding candidate on filling details
  addCandidate(candidate): Observable<any> {
    return this.http.post<any>(this._url + "/api/candidate/add-candidate", candidate, this.httpOptions);
  }

  // getting the list of all interviewer
  getInterviewer(): Observable<any> {
    return this.http.get<any>(this._url + "/api/interviewers");
  }

  getInterviewerById(_id): Observable<any> {
    return this.http.get<any>(this._url + '/api/interviewers/' + _id);
  }

  getAdminById(id): Observable<any> {
    return this.http.get<any>(this._url + '/api/interviewer/' + id);
  }

  getCityState(pincode): Observable<any> {
    return this.http.get<any>(this._url + '/api/pincode/' + pincode)
  }

  addInterviewer(interviewer): Observable<any> {
    return this.http.post<any>(this._url + "/api/interviewers/add-interviewer", interviewer, this.httpOptions);
  }

  getSchedule(): Observable<any> {
    return this.http.get<any>(this._url + "/api/schedule");
  }

  getScheduleByCandidateId(candidate_id): Observable<any> {
    return this.http.get<any>(this._url + '/api/schedule/candidate/' + candidate_id);
  }

  getScheduleByInterviewerId(_id): Observable<any> {
    return this.http.get<any>(this._url + '/api/schedule/interviewer/' + _id);
  }

  getScheduleByJobId(candidate_id, job_id): Observable<any> {
    console.log(candidate_id, job_id);

    return this.http.post<any>(this._url + '/api/schedule/job', { candidate_id, job_id }, this.httpOptions);
  }

  addSchedule(candidate_id, job_id): Observable<any> {
    return this.http.post<any>(this._url + '/api/schedule/add-schedule', { candidate_id, job_id }, this.httpOptions);

  }

  updateSchedule(schedule): Observable<any> {
    return this.http.post(this._url + '/api/schedule/update-schedule', schedule, this.httpOptions);
  }

  addJob(job): Observable<any> {
    return this.http.post<any>(this._url + "/api/job/add-job", job, this.httpOptions);

  }

  updateJob(formData_id, postJobFormValue): Observable<any> {
    return this.http.put<any>(this._url + "/api/job/update-job", { job_id: formData_id, formValue: postJobFormValue }, this.httpOptions);
  }

  removeJob(job_id): Observable<any> {
    return this.http.put<any>(this._url + "/api/job/remove-job", { job_id: job_id }, this.httpOptions);
  }

  getPostedJobs(): Observable<Object[]> {
    return this.http.get<Object[]>(this._url + "/api/job");
  }

  getNotAppliedPostedJobs(candidate_id): Observable<any> {
    return this.http.get<any>(this._url + "/api/job/" + candidate_id);
  }


}