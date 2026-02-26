import { SpecifyDescription } from "@/constant";
import { SpecificationColumn, SpecificationDatas } from '../../../Data/SpecificationData';
import DataTables from '../../Element/DataTable';

const SpecificationDetail = () => {
  return (
    <div className='pro mb-4 specification-detail'>
      <p className='font-light'>{SpecifyDescription}</p>
      <div className='table-responsive specification-table-wrap'>
        <DataTables data={SpecificationDatas} columns={SpecificationColumn} />
      </div>
    </div>
  );
};

export default SpecificationDetail;
