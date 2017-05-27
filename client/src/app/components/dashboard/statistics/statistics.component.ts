import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../_services/http.service'
import { FileModel } from '../../../_models/FileModel'
import { StatisticsService } from '../../../_services/statistics.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  hitRate: number;
  recentFiles = [];
  averageTime;
  averageHitRate;

  constructor(private httpService: HttpService, private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.getRecentFiles();
    this.httpService.getBookedFiles()
      .subscribe(res => {
        this.hitRate = this.statisticsService.statsticsCalculation(res);
      }, error => {
        console.log(error);
      })
  }

  getRecentFiles() {
    this.httpService.getAllFiles()
      .subscribe(res => {
        let originalName;
        let status;
        let time;

        for (const key of Object.keys(res.data)) {
          if (res.data[key].status === 'uploaded') {
            originalName = res.data[key].originalname;
            status = res.data[key].status;
            this.recentFiles[key] = new FileModel(originalName, status, null);
          } else {
            originalName = res.data[key].originalname;
            status = res.data[key].status;
            time = res.data[key].extractionTime;
            this.recentFiles[key] = new FileModel(originalName, status, time);
          }
        }
        this.recentFiles.reverse();
        this.getAverarge();
        if (this.recentFiles.length > 10) {
          this.recentFiles.splice(10, (this.recentFiles.length - 10))
        }
      }, error => {
      });
  }
    getAverarge() {
      let counter = 0;
      let time = 0;
      for (const key of Object.keys(this.recentFiles)) {
        if (this.recentFiles[key].time) {
          time += this.recentFiles[key].time;
          counter++;
        }
      }
      this.averageTime = time / counter;
    }
}
