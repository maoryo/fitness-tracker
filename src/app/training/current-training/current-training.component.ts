import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {StopTrainingComponent} from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingCanceled = new EventEmitter<void>();
  progress = 0;
  timer: number;

  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 20;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const bottomSheetRef = this.bottomSheet.open(StopTrainingComponent);
    bottomSheetRef.afterDismissed().subscribe(isCanceled => {
      isCanceled ? this.trainingCanceled.emit() : this.startOrResumeTimer();
    });
  }
}
