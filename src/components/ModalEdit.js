import './ModalEdit.css';
import {useEffect, useRef, useState} from 'react';
import {useMutation} from '@apollo/client';
import {update95, update98, updateDiesel} from '../utils/queries';

const ModalEdit = ({prices, item, isOpen, setIsOpen, setLoading, loading}) => {
  const form = useRef();

  const [doUpdate95] = useMutation(update95);
  const [doUpdate98] = useMutation(update98);
  const [doUpdateDiesel] = useMutation(updateDiesel);

  const doUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const elements = form.current.elements;
    const p95 = elements.p95.value.trim();
    const p98 = elements.p98.value.trim();
    const pDiesel = elements.pDiesel.value.trim();

    if (p95 !== '' && !isNaN(p95)) {
      try {
        await doUpdate95({variables: {stationId: item.id, price: p95}});
      } catch (e) {
        console.error('95 error');
      }
    }
    if (p98 !== '' && !isNaN(p98)) {
      try {
        await doUpdate98({variables: {stationId: item.id, price: p98}});
      } catch (e) {
        console.error('98 error');
      }
    }
    if (pDiesel !== '' && !isNaN(pDiesel)) {
      try {
        await doUpdateDiesel({variables: {stationId: item.id, price: pDiesel}});
      } catch (e) {
        console.error('Diesel error');
      }
    }
    setLoading(false);
    setIsOpen(false)
  };

  useEffect(() => {
    console.log("prices edit", prices)
  }, [prices])

  return (
      <form ref={form} className="edit-form">
        <label>
          Enter new 95 price
          <input name="p95" type="text"
                 placeholder={prices.fuel95.price ? prices.fuel95.price : 'Enter new price'}/>
        </label><br/>
        <label>
          Enter new 98 price
          <input name="p98" type="text"
                 placeholder={prices.fuel98.price ? prices.fuel98.price : 'Enter new price'}/>
        </label><br/>
        <label>
          Enter new Diesel price
          <input name="pDiesel" type="text" placeholder={prices.fuelDiesel.price ?
              prices.fuelDiesel.price :
              'Enter new price'}/>
        </label><br/>
        <input disabled={loading} type="submit" value="Update"
               onClick={doUpdate}/>
      </form>
  );
};

export default ModalEdit;