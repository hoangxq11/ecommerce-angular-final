import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryData } from 'src/app/commons/dto/category';
import { ProductData, SearchReq } from 'src/app/commons/dto/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchReq: SearchReq = {keyWord: ''};
  productListData!: ProductData[];
  categoryListData!: CategoryData[];

  currentPage = 1;
  pageSize = 8;
  totalItems!: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.route.params.subscribe(params => {
      console.log(params)
      this.searchReq.keyWord = params['id'];
      this.searchProduct();
    });
  }

  getAllCategory(){
    this.categoryService.getDataCategorySpe().subscribe(data => {
      this.categoryListData = data.data;
      this.totalItems = data.data.length;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    })
  }

  searchProduct () {
    this.productService.searchProducts(this.searchReq).subscribe(data => {
      this.productListData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    })
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

}
