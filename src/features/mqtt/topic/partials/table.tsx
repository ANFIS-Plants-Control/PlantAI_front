import {
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTopicStore } from "../store";
import { DialogEdit } from "./dialogEdit";
import { useGlobalStore } from "../../../../stores/GlobalStore";

export function TopicsTable() {
  const topics = useTopicStore((s) => s.topics);
  const openEdit = useTopicStore((s) => s.openEdit);
  const showNotAvailable = useGlobalStore((s) => s.showNotAvailable);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 28,
  }));
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Topic</StyledTableCell>
            <StyledTableCell width={150}>Изменить</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {topics.map((topic) => (
            <TableRow key={topic.id}>
              <TableCell sx={{ fontSize: "1.25rem" }}>{topic.id}</TableCell>

              <TableCell sx={{ fontSize: "1.25rem" }}>{topic.topic}</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => {
                    openEdit(topic.id);

                    showNotAvailable();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogEdit />
    </Paper>
  );
}
