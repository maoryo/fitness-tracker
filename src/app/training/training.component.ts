import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TrainingService} from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  exerciseSub: Subscription;
  activeTraining = false;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.activeTraining = !!exercise;
    });
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }

}
