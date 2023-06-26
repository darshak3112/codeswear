import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const UsersTable = ({users}) => {
  return (
    <BaseCard title="All Users">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email / Phone
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Address
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Role
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Created At
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                {user.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {user.email}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
					{user.phone}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{user.address}</Typography>
              </TableCell>
			  <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: user.role == 'user' ? 'gray' : 'red',
                    color: "#fff",
                  }}
                  size="small"
                  label={user.role}
                ></Chip>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{new Date(user.createdAt).toISOString().split('T')[0]}</Typography>
              </TableCell>
			  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default UsersTable;
