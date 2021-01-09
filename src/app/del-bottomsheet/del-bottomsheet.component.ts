import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-del-bottomsheet',
  templateUrl: './del-bottomsheet.component.html',
  styleUrls: ['./del-bottomsheet.component.css']
})
export class DelBottomsheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<DelBottomsheetComponent>) { }

  ngOnInit(): void {
  }
  closeBottomSheetYes() {
    this.bottomSheetRef.dismiss(true);
  }

  closeBottomSheetNO() {
    this.bottomSheetRef.dismiss(false);
  }

}
