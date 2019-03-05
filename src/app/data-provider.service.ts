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
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient){}

  decodeToken(token):Observable<any>{
    return this.http.get<any>(this._url+'/api/authenticate',
    {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+token
      })
    }
    )
  }

  uploadResumeFile(file):Observable<any>{
    console.log(file);
    return this.http.post<any>(this._url+'/api/candidate/upload',file);

  }

  // login
  login(user_id):Observable<any>{
    return this.http.post<any>(this._url+'/api/login',user_id,this.httpOptions);
  }

  // getting the list of all candidates
  getCandidates(): Observable<any>{
    return this.http.get<any>(this._url+"/api/candidate");
  }

  getCandidateById(id):Observable<any>{
    return this.http.get<any>(this._url+'/api/candidate/'+id);
  }

  updateCandidate(id,candidate):Observable<any>{
    return this.http.post<any>(this._url+'/api/candidate/update-candidate',{_id:id , candidate},this.httpOptions );
  }

  updateCandidateJob(_id,job_id):Observable<any>{
    return this.http.post<any>(this._url+'/api/candidate/update-candidate-job',{_id,job_id},this.httpOptions);
  }

// adding candidate on filling details
  addCandidate(candidate):Observable<any>{
    return this.http.post<any>(this._url+"/api/candidate/add-candidate",candidate,this.httpOptions);
  }

// getting the list of all interviewer
  getInterviewer(): Observable<any>{
    return this.http.get<any>(this._url+"/api/interviewers");
  }

  getInterviewerById(id):Observable<any>{
    return this.http.get<any>(this._url+'/api/interviewer/'+id);
  }

  getAdminById(id):Observable<any>{
    return this.http.get<any>(this._url+'/api/interviewer/'+id);
  }

  getCityState(pincode):Observable<any>{
    return this.http.get<any>(this._url+'/api/pincode/'+pincode)
  }

  addInterviewer(interviewer):Observable<any>{
    return this.http.post<any>(this._url+"/api/interviewer/add-interviewer",interviewer,this.httpOptions);
  }

  getSchedule(): Observable<any>{
    return this.http.get<any>(this._url+"/api/schedule");
  }

  getScheduleByCandidateId(candidate_id):Observable<any>{
    return this.http.get<any>(this._url+'/api/schedule/candidate/'+candidate_id);
  }

  getScheduleByJobId(candidate_id,job_id):Observable<any>{
    console.log(candidate_id,job_id);
    
    return this.http.post<any>(this._url+'/api/schedule/job',{candidate_id,job_id},this.httpOptions);
  }

  addSchedule(candidate_id,job_id): Observable<any>{
    return this.http.post<any>(this._url+'/api/schedule/add-schedule',{candidate_id,job_id},this.httpOptions);
    
  }

  updateSchedule(schedule):Observable<any>{
    return this.http.post(this._url+'/api/schedule/update-schedule',schedule,this.httpOptions);
  }

  addJob(job):Observable<any>{
    return this.http.post<any>(this._url+"/api/job/add-job",job,this.httpOptions);

  }

  updateJob(formData_id,postJobFormValue):Observable<any>{
    return this.http.put<any>(this._url+"/api/job/update-job",{job_id:formData_id,formValue:postJobFormValue},this.httpOptions);
  }

  removeJob(job_id):Observable<any>{
    return this.http.put<any>(this._url+"/api/job/remove-job",{job_id:job_id},this.httpOptions);
  }

  getPostedJobs():Observable<Object[]>{
    return this.http.get<Object[]>(this._url+"/api/job");
  }
  

}