import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import useGetClient from './useGetClient';

export default function useGetClientFormDefaultValues() {
  const { clientId } = useParams<{ clientId: string }>();

  const isEdit = !!clientId;

  const { data: client } = useGetClient(clientId);

  const defaultValues = useMemo(() => {
    if (isEdit) return client;
    return {
      clientIcon: '',
      clientName: '',
      birthday: null,
      address: '',
      supervisorName: '',
      supervisorPhone: '',
      officePhone: '',
      emergencyContact: '',
      emergencyContactPhone: '',
      serviceItems: [],
    };
  }, [client, isEdit]);

  return { defaultValues };
}
