import useGetRuas from '@/hooks/useGetRuas';
import usePostRuas from '@/hooks/usePostRuas';
import usePostUpdateRuas from '@/hooks/usePostUpdateRuas';
import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react'
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

interface ModalRuasProps {
  onCloseModal: () => void;
  showModal: boolean;
  id?: string | number;
  isNew: boolean
}

const ModalRuas = ({ onCloseModal, showModal, id, isNew }: ModalRuasProps) => {
  const queryClient = useQueryClient();

  const { data: ruas } = useGetRuas({
    id: id as string,
    options: {
      enabled: !!id
    }
  });

  const { mutate: postRuas } = usePostRuas({
    onSuccess(res) {
      if(res.status) {
        onCloseModal();
        formik.resetForm();
        queryClient.invalidateQueries('useGetAllRuas');
      }
    },
    onError(error) {
      formik.setFieldError('message', error.response?.data.message[0])
    }
  });

  const { mutate: postUpdateRuas } = usePostUpdateRuas({
    onSuccess(res) {
      if(res.status) {
        onCloseModal();
        formik.resetForm();
        queryClient.invalidateQueries('useGetAllRuas');
      }
    },
    onError(error) {
      formik.setFieldError('message', error.response?.data.message[0])
    }
  });


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (event.target.id === 'photo_input') {
        formik.setFieldValue('photo', file);
      } else if (event.target.id === 'document_input') {
        formik.setFieldValue('file', file);
      }
    }
  };

  const PostRuasSchema = Yup.object().shape({
    unit_id: Yup.number().required('Unit ID is required'),
    ruas_name: Yup.string().required('Ruas Name is required'),
    long: Yup.number().required('Long is required'),
    km_awal: Yup.string().required('KM Awal is required'),
    km_akhir: Yup.string().required('KM Akhir is required'),
    status: Yup.boolean().required('Status is required'),
    photo: Yup.mixed().required('Photo is required'),
    file: Yup.mixed().required('Document is required'),
  });

  const formik = useFormik({
    initialValues: {
      unit_id: ruas?.data.unit_id || '',
      ruas_name: ruas?.data.ruas_name || '',
      long: ruas?.data.long || '',
      km_awal: ruas?.data.km_awal || '',
      km_akhir: ruas?.data.km_akhir || '',
      status: ruas?.data.status || true,
      photo: ruas?.data.photo_url || '',
      file: ruas?.data.doc_url || '',
      message: undefined,
    },
    validationSchema: PostRuasSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('unit_id', String(values.unit_id));
      formData.append('ruas_name', values.ruas_name);
      formData.append('long', String(values.long));
      formData.append('km_awal', values.km_awal);
      formData.append('km_akhir', values.km_akhir);
      formData.append('status', String(values.status));
      formData.append('photo', values.photo);
      formData.append('file', values.file);

      if (isNew) {
        await postRuas(formData);
      } else {
        formData.append('_method', 'PUT');
        await postUpdateRuas({ id: id as string, formData });
      }
    },
  });

  return (
<>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Data Ruas</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onCloseModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {formik.errors.message && (
                  <div className="text-red-600 text-sm text-center">{formik.errors.message}</div>
                )}
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative p-6 flex flex-col gap-5">
                    <div className='flex gap-5'>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="unit_id">
                          Unit Id
                        </label>
                        <input
                          type="number"
                          id="unit_id"
                          placeholder="Unit Id"
                          className="border border-gray-300 rounded-md p-2"
                          value={formik.values.unit_id}
                          onChange={formik.handleChange}
                          name="unit_id"
                        />
                        {formik.errors.unit_id && (
                          <div className="text-red-600 text-xs">{formik.errors.unit_id}</div>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="ruas_name">
                          Ruas Name
                        </label>
                        <input
                          type="text"
                          id="ruas_name"
                          placeholder="Ruas Name"
                          className="border border-gray-300 rounded-md p-2"
                          value={formik.values.ruas_name}
                          onChange={formik.handleChange}
                          name="ruas_name"
                        />
                        {formik.errors.ruas_name && (
                          <div className="text-red-600 text-xs">{formik.errors.ruas_name}</div>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-5'>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="long">
                          Long
                        </label>
                        <input
                          type="number"
                          id="long"
                          placeholder="Long"
                          className="border border-gray-300 rounded-md p-2"
                          value={formik.values.long}
                          onChange={formik.handleChange}
                          name="long"
                        />
                        {formik.errors.long && (
                          <div className="text-red-600 text-xs">{formik.errors.long}</div>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="km_awal">
                          KM Awal
                        </label>
                        <input
                          type="text"
                          id="km_awal"
                          placeholder="KM Awal"
                          className="border border-gray-300 rounded-md p-2"
                          value={formik.values.km_awal}
                          onChange={formik.handleChange}
                          name="km_awal"
                        />
                        {formik.errors.km_awal && (
                          <div className="text-red-600 text-xs">{formik.errors.km_awal}</div>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-5'>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="km_akhir">
                          KM Akhir
                        </label>
                        <input
                          type="text"
                          id="km_akhir"
                          placeholder="KM Akhir"
                          className="border border-gray-300 rounded-md p-2"
                          value={formik.values.km_akhir}
                          onChange={formik.handleChange}
                          name="km_akhir"
                        />
                        {formik.errors.km_akhir && (
                          <div className="text-red-600 text-xs">{formik.errors.km_akhir}</div>
                        )}
                      </div>
                      <div className='w-full'>
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="status">
                          Status
                        </label>
                        <select
                          id="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          value={formik.values.status ? '1' : '0'}
                          onChange={formik.handleChange}
                          name="status"
                        >
                          <option value="1">Aktif</option>
                          <option value="0">Non Aktif</option>
                        </select>
                        {formik.errors.status && (
                          <div className="text-red-600 text-xs">{formik.errors.status}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="photo_input">
                        Upload Image
                      </label>
                      <input
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                        id="photo_input"
                        type="file"
                        accept="image/*"
                      />
                      {formik.errors.photo && (
                        <div className="text-red-600 text-xs">{formik.errors.photo}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="document_input">
                        Upload Document
                      </label>
                      <input
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                        id="document_input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                      />
                      {formik.errors.file && (
                        <div className="text-red-600 text-xs">{formik.errors.file}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-4 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        onCloseModal();
                        formik.resetForm();
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default ModalRuas