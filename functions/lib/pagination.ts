function paginate(totalLength: number, rowsPerPage: number, currentPage: number) {
  const totalPages = Math.ceil(totalLength / rowsPerPage);
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const skip = (safePage - 1) * rowsPerPage;
  const take = Math.min(rowsPerPage, totalLength - skip);

  return {
    totalPages,
    currentPage: safePage,
    rowsPerPage,
    skip,
    take,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    startRecord: totalLength === 0 ? 0 : skip + 1,
    endRecord: skip + take,
    totalLength,
  };
}
// take matters for the last page (e.g. 237 records, 10 per page: page 24 has only 7, not 10). skip is exactly what you'd pass to a database OFFSET or Prisma skip. And safePage clamps the input so if someone passes page 99 on a 10-page dataset it gracefully returns page 10.