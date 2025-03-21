import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stack,
  styled,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import zIndex from '@mui/material/styles/zIndex';
import { useRouter } from 'next/navigation';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid rgba(17,17,17,0.082)',
  // '&:last-child': {
  //   border: 0,
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor:'pointer',
  'td, th': {
    borderBottom: '1px solid rgba(17,17,17,0.082)',
  },
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: 'rgba(17, 17, 17, 0.92)',
  fontSize: ' 18px',
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '0.27px',
  marginBottom: '16px',
}));

const StyledSubtitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  borderRadius: '28px',
  background: '#EEEFF2',
  padding: '8px 12px',
  width: 'max-content',
  textAlign: 'center',
  color: 'rgba(17, 17, 17, 0.68)'
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: 'rgba(17, 17, 17, 0.62)',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '100%', // 14px
  letterSpacing: '0.14px',
  leadingTrim: 'both',
  textEdge: 'cap',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: 'inline-flex',
  padding: '6px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '8px',
  background: '#EAF6F2',
  minHeight: '28px',

  '& .Mui-selected': {
    color: 'white !important',
  },
  '& .MuiTabs-indicator': {
    display: 'block',
    height: '100%',
    width: '100%',
    background: "#06B776",
    color: 'white',
    zIndex: 0,
    borderRadius: '4px',

  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  display: 'flex',
  padding: '9px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  position: 'relative',
  zIndex: 1,
  width: 'max-content',
  minWidth: 'max-content',
  minHeight: '28px',

}));

const JobPostings = ({ statusFilter,setStatusFilter,jobPostings,  customStyle = {},}) => {
  // const [jobPostings, setJobPostings] = useState([]);
  // const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter()
  // useEffect(() => {
  //   const fetchJobPostings = async () => {
  //     const token = localStorage.getItem('jwt');
  //     let url = 'https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs';
  //     if (statusFilter !== 'all') {
  //       url += `?status=${statusFilter}`;
  //     }

  //     try {
  //       const response = await fetch(url, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       const data = await response.json();
  //       setJobPostings(data);
  //     } catch (error) {
  //       console.error('Error fetching job postings:', error);
  //     }
  //   };

  //   fetchJobPostings();
  // }, [statusFilter]);

  const handleStatusChange = (event, newValue) => {
    setStatusFilter(newValue);
  };

  return (
    <DashboardCard customStyle={{ padding: '0px', ...customStyle }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography variant="h2" fontWeight={'semibold'} fontSize={'24px'} color={'rgba(17,17,17,0.92)'} letterSpacing={'0.12px'}>
            Job Postings
          </Typography>
          <Typography variant="h2" fontWeight={'semibold'} fontSize={'24px'} color={'rgba(17,17,17,0.52)'} letterSpacing={'0.12px'}>
            {`(${jobPostings.length})`}
          </Typography>
        </Stack>
        <StyledTabs value={statusFilter} onChange={handleStatusChange} aria-label="job status tabs">
          <StyledTab label="All" value="all" />
          <StyledTab label="Active" value="active" />
          <StyledTab label="Closed" value="closed" />
        </StyledTabs>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableHeaderCell>
                  Role
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Applicants
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Assessment
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Interviews
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Accepted
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Rejected
                </StyledTableHeaderCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {jobPostings && jobPostings?.map((job) => (
                <StyledTableRow key={job.id} onClick={()=>router.push(`/dashboard/job-posting/${job.id}/submissions`)}>
                  <StyledTableCell>
                    <Stack>
                      <StyledTypography>
                        {job.title}
                      </StyledTypography>
                      <Stack direction='row' gap={1}>
                        <StyledSubtitleTypography>
                          {job.job_type}
                        </StyledSubtitleTypography>
                        <StyledSubtitleTypography>
                          {job.work_model}
                        </StyledSubtitleTypography>
                        <StyledSubtitleTypography>
                          {job.location}
                        </StyledSubtitleTypography>
                      </Stack>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      <Box>
                        <Typography color="rgba(17, 17, 17, 0.84)" fontWeight={500} fontSize={'16px'}>
                          {job.stage_counts.new}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      <Box>
                        <Typography color="rgba(17, 17, 17, 0.84)" fontWeight={500} fontSize={'16px'}>
                          {job.stage_counts.skill_assessment}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      <Box>
                        <Typography color="rgba(17, 17, 17, 0.84)" fontWeight={500} fontSize={'16px'}>
                          {job.stage_counts.interviews}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      <Box>
                        <Typography color="rgba(17, 17, 17, 0.84)" fontWeight={500} fontSize={'16px'}>
                          {job.stage_counts.acceptance}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                      <Box>
                        <Typography color="rgba(17, 17, 17, 0.84)" fontWeight={500} fontSize={'16px'}>
                          {job.stage_counts.rejection}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default JobPostings;
