import { useState } from 'react'
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import IStudentModel, { IList } from '../../../Models/IStudentModel';
import studentService from '../../../Services/StudentService';
import notification from '../../../Services/Notification';
import { Typography} from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import heILGrid from '../../../Utils/HebrewIL';


const Import = ():JSX.Element => {

    const { register, handleSubmit } = useForm<IList>();

    const [students, setStudents] = useState<IStudentModel[]>([]);
    const [ load, setLoad ] = useState<boolean>(false);

    const send = async ( data:IList ) => {
        setLoad(true);
        const formData = new FormData();
        formData.append("list", data.list[0] );
        if( data.test ){
          formData.append("test", '1' );
        }
        try {
          const newStudents = await studentService.importStudents( formData );
          setStudents(newStudents);
          if( data.test ){
            notification.success("יבוא טסט הצליח, יש להוריד את סמן הטסט וללחוץ שוב על היבוא על מנת לייבא");
          }else{
            notification.success("יבוא נתונים הושלם בהצלחה");
          }
        } catch (error) {
          notification.error("ארעה שגיאה, היבוא לא הצליח")
        }finally{
          setLoad(false);
        }
    }


    const columns: GridColDef[] = [
      {
        field: 'firstName',
        headerName: 'שם פרטי',
        width: 150,
      },
      {
        field: 'lastName',
        headerName: 'שם משפחה',
        width: 150,
      },
      {
        field: 'dateOfBirth',
        headerName: 'תאריך לידה',
        width: 150,
        valueGetter: (params: GridCellParams) => new Date(params.value as Date).toLocaleDateString(),
      },
      {
        field: 'gender',
        headerName: 'מין',
        width: 120,
      },
      {
        field: 'address',
        headerName: 'כתובת',
        width: 250,
      }
    ];
  
    const CustomToolbar = () => (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{          
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
      </GridToolbarContainer>
    );

    return (

      <div style={{ width: '100%' }} className={ load ? "load" : ""}>
        <h1 style={{ flex: 1 }}>ייבוא תלמידים</h1>
          <Box mt={5} mb={5}>
            <form onSubmit={handleSubmit(send)}>
                <Box mt={5} mb={1}>
                  <input accept='.xlsx' type="file" {...register("list")}/>
                </Box>
                <Typography ><input type="checkbox" {...register("test")} /> בדיקה בלבד - ללא יבוא למערכת </Typography>
                <Button sx={{marginTop: 2}} type='submit' variant="contained">ייבוא</Button>
            </form>
          </Box>


          { students.length  ? 
            <DataGrid
              getRowId={(row) => row._id }
              rows={students}
              columns={columns}
              autoHeight
              localeText={heILGrid}
              components={{
                Toolbar: CustomToolbar, // Use the custom toolbar component
              }}
            />
          : <></>}

        </div>
    );
}

export default Import;