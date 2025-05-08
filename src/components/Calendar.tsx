'use client';

import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useTheme } from "@mui/material/styles";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import { CalendlyEvent } from '@/types/calendly';

interface CalendarProps {
  events: CalendlyEvent[];
  customStyle?: React.CSSProperties;
  loading?: boolean;
  error?: string | null;
}

const pastelColors = [
  {
    background: 'rgba(255, 192, 203, 0.15)', // Soft pink
    border: 'rgba(255, 192, 203, 0.6)',
    dot: 'rgba(255, 192, 203, 0.8)'
  },
  {
    background: 'rgba(176, 196, 222, 0.15)', // Soft blue
    border: 'rgba(176, 196, 222, 0.6)',
    dot: 'rgba(176, 196, 222, 0.8)'
  },
  {
    background: 'rgba(152, 251, 152, 0.15)', // Soft green
    border: 'rgba(152, 251, 152, 0.6)',
    dot: 'rgba(152, 251, 152, 0.8)'
  },
  {
    background: 'rgba(255, 218, 185, 0.15)', // Soft peach
    border: 'rgba(255, 218, 185, 0.6)',
    dot: 'rgba(255, 218, 185, 0.8)'
  },
  {
    background: 'rgba(230, 230, 250, 0.15)', // Soft lavender
    border: 'rgba(230, 230, 250, 0.6)',
    dot: 'rgba(230, 230, 250, 0.8)'
  },
  {
    background: 'rgba(255, 228, 225, 0.15)', // Soft misty rose
    border: 'rgba(255, 228, 225, 0.6)',
    dot: 'rgba(255, 228, 225, 0.8)'
  }
];

const getEventColor = (eventName: string) => {
  // Generate a consistent index based on the event name
  const hash = eventName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Use the hash to select a color from our array
  const index = Math.abs(hash) % pastelColors.length;
  return pastelColors[index];
};

const Calendar: React.FC<CalendarProps> = ({ events, customStyle, loading, error }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <DashboardCard customStyle={{ padding: '0px', ...customStyle }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard customStyle={{ padding: '0px', ...customStyle }}>
        <Box sx={{ p: 3 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard customStyle={{ padding: '0px', ...customStyle }}>
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "rgba(17, 17, 17, 0.92)",
              fontSize: 24,
              lineHeight: "24px",
              letterSpacing: "0.36px",
            }}
          >
            Upcoming Events
          </Typography>

         { events.length > 0 && <Box sx={{ cursor:"pointer", display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 14,
                lineHeight: "14px",
                letterSpacing: "0.14px",
                mr: 0.5,
              }}
            >
              See all
            </Typography>
            <ArrowForwardOutlined
              sx={{ color: "secondary.main", width: 20, height: 20 }}
            />
          </Box>}
        </Box>
      
      {events.length === 0 ? (
        <Typography sx={{ p: 2, color: 'rgba(17, 17, 17, 0.6)' }}>
          No upcoming events
        </Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, overflow: "auto", 
          height: 'calc(300px - 100px)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#032B4420 transparent',
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#032B44',
            width: '4px', 
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(68, 68, 226, 0.3)',
            },
          }, }}>
          {events.map((event, index) => (
            <React.Fragment key={event.uri}>
              <ListItem 
                alignItems="flex-start"
                sx={{
                  p: 2,
                  backgroundColor: getEventColor(event.name).background,
                  '&:hover': {
                    backgroundColor: getEventColor(event.name).background,
                  },
                }}
              >
                <Box
                  sx={{
                    width: '4px',
                    height: '100%',
                    backgroundColor: getEventColor(event.name).border,
                    borderRadius: '2px',
                    mr: 2,
                    minHeight: '60px',
                  }}
                />
                <ListItemText
                  sx={{ m: 0 }}
                  primary={
                    <Typography
                      component="span"
                      variant="subtitle1"
                      sx={{ 
                        color: 'rgba(17, 17, 17, 0.92)',
                        fontWeight: 500,
                        fontSize: '15px',
                        lineHeight: '20px',
                        mb: 0.5,
                      }}
                    >
                      {event.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ 
                            color: 'rgba(17, 17, 17, 0.6)',
                            fontSize: '13px',
                            lineHeight: '16px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: getEventColor(event.name).dot,
                              mr: 1,
                            }}
                          />
                          {format(new Date(event.start_time), 'EEEE, MMMM d, yyyy')}
                        </Typography>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ 
                          color: 'rgba(17, 17, 17, 0.6)',
                          fontSize: '13px',
                          lineHeight: '16px',
                          display: 'block',
                          ml: 2,
                        }}
                      >
                        {format(new Date(event.start_time), 'h:mm a')} - {format(new Date(event.end_time), 'h:mm a')}
                      </Typography>
                      {event.location && (
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ 
                            color: 'rgba(17, 17, 17, 0.6)',
                            fontSize: '13px',
                            lineHeight: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            mt: 0.5,
                            ml: 2,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(17, 17, 17, 0.2)',
                              mr: 1,
                            }}
                          />
                          {event.location.type === 'physical' ? 'Location: ' : 'Meeting: '}
                          {event.location.location}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < events.length - 1 && (
                <Divider 
                  component="li" 
                  sx={{ 
                    borderColor: 'rgba(17, 17, 17, 0.08)',
                    mx: 2,
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
      </Box>    
    </DashboardCard>
  );
};

export default Calendar; 