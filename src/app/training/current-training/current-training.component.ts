import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {StopTrainingComponent} from './stop-training/stop-training.component';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(private bottomSheet: MatBottomSheet, private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const bottomSheetRef = this.bottomSheet.open(StopTrainingComponent);
    bottomSheetRef.afterDismissed().subscribe(isCanceled => {
      isCanceled ? this.trainingService.cancelExercise(this.progress) : this.startOrResumeTimer();
    });
  }
}
