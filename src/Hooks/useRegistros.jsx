// src/hooks/useRegistros.js
import { useState, useEffect, useCallback } from 'react';

export function useRegistros() {
  const [registros, setRegistros] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const fetchRegistros = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch('https://api-registro-de-gastos.vercel.app/api/registros/all');
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      console.error('Erro ao carregar registros', error);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistros();
  }, [fetchRegistros]);

  return { registros, loadingList, fetchRegistros };
}
