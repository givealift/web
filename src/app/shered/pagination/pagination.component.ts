import {
    ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange,
    SimpleChanges
} from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

    @Output()
    pageChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Input()
    applications: any[] = [];
    pageAmount: number = 0;
    pageNumbers: Array<number> = [];
    readonly applicationsOnPage = 10;
    currentPage: number = 1;

    constructor() {
    }


    changePageNumber(pageNum: any) {
        if (pageNum > 0 && pageNum <= this.pageAmount) {
            this.pageChange.emit(this.applications.slice((pageNum - 1) * this.applicationsOnPage, pageNum * this.applicationsOnPage));
            this.currentPage = pageNum;

        }
    }

    ngOnChanges(changes: SimpleChange) {
        this.currentPage = 1;
        this.pageAmount = Math.ceil(this.applications.length / this.applicationsOnPage);
        this.pageChange.emit(this.applications.slice(0, this.applicationsOnPage));
        this.pageNumbers = Array.from(new Array(this.pageAmount), (val, index) => index + 1);

    }


}
