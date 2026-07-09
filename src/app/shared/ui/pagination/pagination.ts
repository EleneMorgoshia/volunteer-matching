import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { PageModel } from './pagination.model';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  totalItems = input.required<number>();
  currentPage = input.required<number>();
  perPage = input<number>(12); // ეს სასურველია მოქნილობისთვის

  pageChanged = output<number>();

  paginationItems = computed<PageModel[]>(() => {
    const result: PageModel[] = [];

    const end = this.totalItems();
    const curr = this.currentPage();
    const perPg = this.perPage();
    // const totalPages = end % perPg ? end / perPg + 1 : end / perPg;

    const totalPages = Math.ceil(end / perPg);
    for (let i = 1; i <= totalPages; i++) {
      result.push({ type: 'page', value: i, key: 'page_' + i });
    }
    return result;
  });

  onPageChange(pageNum: number | undefined = 1) {
    if (pageNum === this.currentPage()) return;
    this.pageChanged.emit(pageNum);
  }
}
