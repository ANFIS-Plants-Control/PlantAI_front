import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTopicStore } from "./store";
import { useEffect } from "react";
import { TopicsTable } from "./partials/table";
import { Title } from "./partials/title";
import { DialogCreate } from "./partials/dialogCreate";

export function Topic() {
  const init = useTopicStore((s) => s.init);
  const topics = useTopicStore((s) => s.topics);
  useEffect(() => {
    init();
  }, [init]);
  return (
    <Box
      sx={{
        flex: 1,
        p: 4,
      }}
    >
      <DialogCreate />
      <Stack spacing={4}>
        <Title />

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Всего топиков
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {topics.length}
          </Typography>
        </Paper>
        <TopicsTable />
      </Stack>
    </Box>
  );
}
