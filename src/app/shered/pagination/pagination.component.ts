import {Component, EventEmitter, Input, Output, SimpleChange} from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

    @Output()
    pageChange: EventEmitter<number> = new EventEmitter<number>();
  pageAmount: number;
  @Input()
  elementsAmount: number = 0;
    pageNumbers: Array<number> = [];
    readonly applicationsOnPage = 10;
    currentPage: number = 1;

    constructor() {
    }


    changePageNumber(pageNum: any) {
        if (pageNum > 0 && pageNum <= this.pageAmount) {
          this.pageChange.emit(pageNum);
            this.currentPage = pageNum;
        }
    }

    ngOnChanges(changes: SimpleChange) {
        this.currentPage = 1;
      this.pageChange.emit(1);
      this.pageAmount = Math.ceil(this.elementsAmount / this.applicationsOnPage);
        this.pageNumbers = Array.from(new Array(this.pageAmount), (val, index) => index + 1);

    }


}
