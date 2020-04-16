import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
})
export class StopTrainingComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<StopTrainingComponent>) { }

  ngOnInit(): void {
  }

  onCancel(event: MouseEvent) {
    this.bottomSheetRef.dismiss(true);
    event.preventDefault();
  }
}
