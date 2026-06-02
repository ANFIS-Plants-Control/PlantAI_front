import { Box, Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { useMqttClientsStore } from "../store";

export function MqttClientEditWindow() {
    const dialogOpen = useMqttClientsStore((s) => s.dialogOpen);
    const handleOpenDialog = useMqttClientsStore((s) => s.handleOpenDialog);
    const handleEditClient = useMqttClientsStore((s) => s.handleEditClient)

return (
    <Box>
        <Dialog open={dialogOpen} onClose={() => useMqttClientsStore.getState().handleOpenDialog(false)}>
            <DialogTitle>Редактирование MQTT клиента</DialogTitle>
        <Stack>
            <TextField label="Broker host" />
            <TextField label="Broker port" />
            <TextField label="ClientId" onChange={(val) => handleEditClient('clientId', val.target.value)}/>
            <TextField label="Subscribed topic" />
            <Button sx={{background: '#226f4b30'}} onClick={() => {
              handleOpenDialog(false);
            }}>Update MQTT client</Button>
        </Stack>
        </Dialog>
        
    </Box>
)
}