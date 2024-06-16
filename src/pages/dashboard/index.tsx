import CardBarChart from '@/components/cards/CardBarChart'
import CardPieChart from '@/components/cards/CardPieChart'
import useGetAllRuas, { AllRuasInterface } from '@/hooks/useGetAllRuas';
import useGetAllUnitKerja from '@/hooks/useGetAllUnitKerja';
import React, { useState } from 'react'

const TITLE_HEADER = [
  { title: 'Ruas' },
  { title: 'Lokasi' },
  { title: 'Foto' },
  { title: 'Document' },
  { title: 'Unit Kerja' },
  { title: 'Status' },
];

const Index = () => {
  const [params, setParams] = useState<{ page: number; per_page: number; }>({ page: 1, per_page: 5 });
  const { data: allRuas } = useGetAllRuas({ params });
  const { data: allUnit } = useGetAllUnitKerja({});

  const handleNextPage = () => {
    if (allRuas?.next_page_url) {
      setParams({ ...params, page: params.page + 1 });
    }
  };

  const handlePrevPage = () => {
    if (allRuas?.prev_page_url) {
      setParams({ ...params, page: params.page - 1 });
    }
  };

  const handleChangePage = (page: number) => {
    setParams({ ...params, page });
  };

  const renderItems = (items: AllRuasInterface[]) => (
    <>
      {items?.map((item, index) => (
        <tr key={index} className={`odd:bg-white even:bg-gray-50 border-b`}>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {item.ruas_name}
          </th>
          <td className="px-6 py-4 whitespace-nowrap">{`${item.km_awal} s/d ${item.km_akhir}`}</td>
          <td className="px-6 py-4">
            <div
              onClick={() => { console.log(item.photo_url) }}
              className="text-gray-900 w-20 focus:outline-non cursor-pointer bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 rounded-lg px-3 py-2 text-xs font-medium text-center"
            >
              Lihat
            </div>
          </td>
          <td className="px-6 py-4">
            <div
              onClick={() => { console.log(item.doc_url) }}
              className="text-gray-900 w-20 focus:outline-non cursor-pointer bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 rounded-lg px-3 py-2 text-xs font-medium text-center"
            >
              Download
            </div>
          </td>
          <td className="px-6 py-4">Unit Kerja {item.unit_id}</td>
          <td className="px-6 py-4">{item.status === '1' ? 'Aktif' : 'Tidak Aktif'}</td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="px-4 md:px-10 mx-auto flex flex-col gap-5 md:my-24">
      <div className="sm:flex items-center">
        <div className="w-full h-[300px] sm:w-1/2">
          <CardBarChart data={allUnit?.data || []} />
        </div>
        <div className="w-full h-[200px] sm:w-1/2">
          <CardPieChart data={allUnit?.data || []} />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
            <tr>
              {TITLE_HEADER.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {renderItems(allRuas?.data || [])}
          </tbody>
        </table>
      </div>

      <nav className="text-right">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <div
              onClick={handlePrevPage}
              className="flex items-center cursor-pointer justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </div>
          </li>

          {allRuas?.links.filter((_, index) => index !== 0 && index !== allRuas.links.length - 1).map((link, index) => (
            <li key={index}>
              <div
                onClick={() => handleChangePage(Number(link.label))}
                className={`flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${link.active ? 'border-gray-300 bg-gray-300' : 'border-gray-300 rounded'} hover:bg-gray-100 hover:text-gray-700`}
              >
                {link.label}
              </div>
            </li>
          ))}

          <li>
            <div
              onClick={handleNextPage}
              className="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Index;
