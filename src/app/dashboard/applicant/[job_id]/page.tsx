"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
    CircularProgress,
    Container,
    Stack,
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    styled,
    Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Banner = styled(Box)(({ theme }) => ({
    width: "100%",
    background: theme.palette.primary.main,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "28px",
}));

const Pill = styled(Chip)(({ theme }) => ({
    padding: "10px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    color: "#fff",
}));

const JobDetailsPage = () => {
    const theme = useTheme()
    const { job_id } = useParams();
    const router = useRouter();
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!job_id) return;

        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('jwt');

                const response = await axios.get(
                    `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${job_id}`,{   
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }}
                );
                setJobData(response.data);
            } catch (err) {
                setError("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [job_id]);

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        console.log(files)

        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value, // Store file object if it's a file input
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();

        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "cv") { // Skip cv here, we'll handle it separately
                formDataObj.append(key, value);
            }
        });

        // Append the CV file if it exists
        if (formData.cv) {
            formDataObj.append("cv", formData.cv);
        }

        // Append static fields
        formDataObj.append("job_type", "fulltime");
        formDataObj.append("work_model", "remote");
        formDataObj.append("location", "Lagos Nigeria");
        formDataObj.append("availability", "week");
        formDataObj.append("skills", "php,css");
        formDataObj.append("experience", "5 years");
        formDataObj.append("current_role", "jnr dev");
        formDataObj.append("work_preference", "remote");
        formDataObj.append("salary_range", "100-200");
        formDataObj.append("start_date", "immediately");
        formDataObj.append("address", "34 Ellasan");
        formDataObj.append("github_profile", "https://wwww.linked.com");

        try {
            const token = localStorage.getItem('jwt');

            await axios.post(
                `https://app.elevatehr.ai/wp-json/elevatehr/v1/jobs/${job_id}/applications`,
                formDataObj,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            alert("Application submitted successfully!");
            router.push("/dashboard");
        } catch (error) {
            alert("Failed to submit application. Please try again.");
        }
    };


    if (loading) {
        return (
            <Container sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6">Loading job details...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <>
            <Banner
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    backgroundImage: "url(/images/backgrounds/banner-bg.svg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                height={"204px"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography variant="h4" sx={{ color: "rgba(255, 255, 255, 0.92)", fontSize: "40px", fontWeight: "600" }}>
                    {jobData.title}
                </Typography>
                <Stack mt={2} direction={"row"} alignItems={"center"} gap={"8px"}>
                    <Pill label={jobData.location} />
                    <Pill label={jobData.work_model} />
                    <Pill label={jobData.job_type} />
                </Stack>
            </Banner>

            <Container sx={{ mt: 4, backgroundColor: "#fff", borderRadius: "8px", padding: "40px", fontSize: "16px" }}>
                <Paper sx={{ my: 2 }} elevation={0}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        About the Role
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: jobData.about_role }} />
                </Paper>

                <Paper sx={{ my: 2 }} elevation={0}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Job Responsibilities
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: jobData.responsibilities }} />
                </Paper>

                <Paper sx={{ my: 2 }} elevation={0}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Expectations
                    </Typography>
                    <Typography variant="body1">{jobData.expectations}</Typography>
                </Paper>

                <Paper sx={{ my: 3 }} elevation={0}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Application Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {jobData.application_form?.required_fields.map((field) => (
                            <TextField
                                key={field.key}
                                name={field.key}
                                label={field.label !== "CV" ? field.label : null}
                                type={field.type}
                                fullWidth
                                required={field.required}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        ))}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit Application
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default JobDetailsPage;
