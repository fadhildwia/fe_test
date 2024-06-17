/* eslint-disable react-hooks/rules-of-hooks */
import ModalRuas from '@/components/modal/ModalRuas';
import useDeleteRuas from '@/hooks/useDeleteRuas';
import useGetAllRuas, { AllRuasInterface } from '@/hooks/useGetAllRuas';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';

export const TITLE_HEADER = [
  { title: 'Ruas' },
  { title: 'Lokasi' },
  { title: 'Foto' },
  { title: 'Document' },
  { title: 'Unit Kerja' },
  { title: 'Status' },
];

interface ShowModalInterface {
  isShow: boolean;
  id?: string | number;
  isNew: boolean;
}

const initModal: ShowModalInterface = {
  isShow: false,
  id: '',
  isNew: true
}

const index = () => {
  const queryClient = useQueryClient();

  const [params, setParams] = useState<{ page: number; per_page: number; }>({ page: 1, per_page: 5 });
  const [showModal, setShowModal] = useState<ShowModalInterface>(initModal);
  const { data: allRuas } = useGetAllRuas({ params });

  const { mutateAsync: mutateDeleteRuas } = useDeleteRuas({
    onSuccess: (res) => {
      queryClient.invalidateQueries('useGetAllRuas');
    }
  });

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

  const handleChangePerPage = (e: React.ChangeEvent<any>) => {
    setParams({ page: 1, per_page: e.target.value })
  }

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
          <td className="px-6 py-4 flex gap-2 justify-evenly">
            <div
              onClick={() => setShowModal({ isShow: true, isNew: false, id: item.id })}
              className="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              Edit
            </div>
            <div
              onClick={() => mutateDeleteRuas(Number(item.id))}
              className="font-medium text-red-600 hover:underline cursor-pointer"
            >
              Delete
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="px-4 md:px-10 mx-auto flex flex-col md:mt-24 gap-5">
      <button
        type="button"
        onClick={() => setShowModal({ ...showModal, isShow: true, isNew: true })}
        className="text-gray-900 w-20 focus:outline-non
        bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
        focus:ring-gray-100 rounded-lg px-3 py-2 text-xs font-medium text-center"
      >
        Create
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
            <tr>
              {TITLE_HEADER.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item.title}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {renderItems(allRuas?.data || [])}
          </tbody>
        </table>
      </div>

      <nav className="flex justify-end gap-2">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5"
          value={params.per_page}
          onChange={handleChangePerPage}
          name="perPage"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
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
                className={`flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${link.active ? 'border-gray-300 bg-gray-400' : 'border-gray-300 rounded'} hover:bg-gray-100 hover:text-gray-700`}
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
      <ModalRuas showModal={showModal.isShow} id={showModal.id} isNew={showModal.isNew} onCloseModal={() => setShowModal(initModal)} />
    </div>
  )
}

export default index