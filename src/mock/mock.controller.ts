import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { tableList } from './mock-list';

@Controller('/mock')
export class MockController {
  @Get('/list')
  getList(
    @Req() request: Request,
    @Query() params: PagingParams,
  ): IResponseBodyByPaging<IMockUser> {
    const len = tableList.length;
    const [pageSize, page] = [
      Number.parseInt(params.pageSize),
      Number.parseInt(params.page),
    ];

    const totalPages = Math.ceil(len / pageSize);

    const currentPage = page < 0 ? 0 : page > totalPages ? totalPages : page;

    const currentPageData = tableList.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize,
    );

    const responseBody: IResponseBodyByPaging<IMockUser> = {
      success: true,
      message: '获取数据成功！',
      data: currentPageData,
      meta: {
        /** 本页记录数 */
        itemCount: currentPageData.length,
        /** 总记录数 */
        totalItems: len,
        /** 每页请求几页 */
        itemsPerPage: pageSize,
        /** 总页数 */
        totalPages: totalPages,
        /** 当前第几页 */
        currentPage: currentPage,
      },
    };
    return responseBody;
  }
}
