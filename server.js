const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Mock databases
const users = [{ id: 1, username: 'user1' }];
const notifications = [];

// Add a notification (e.g., when a user comments or likes)
app.post('/api/notifications', (req, res) => {
    const { userId, type, message } = req.body;
    if (!userId || !type || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new notification
    const notification = {
        id: notifications.length + 1,
        userId,
        type,
        message,
        read: false,
        timestamp: new Date()
    };
    notifications.push(notification);

    res.status(201).json(notification);
});

// Get notifications for a user
app.get('/api/notifications/:userId', (req, res) => {
    const { userId } = req.params;
    const userNotifications = notifications.filter(notif => notif.userId === parseInt(userId));
    res.json(userNotifications);
});

// Mark notifications as read
app.post('/api/notifications/read', (req, res) => {
    const { userId } = req.body;
    notifications.forEach(notif => {
        if (notif.userId === userId) {
            notif.read = true;
        }
    });
    res.status(200).json({ message: 'Notifications marked as read' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});