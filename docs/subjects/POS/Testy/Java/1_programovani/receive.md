---
sidebar_position: 2
title: Receive
---


```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.MulticastSocket;
import java.text.SimpleDateFormat;
import java.util.Date;


public class MessageReader implements Runnable {
    private static String HOSTNAME = "0.0.0.0";
    private static int PORT = 8010;
    private Thread thread;
    private byte[] buffer = new byte[256];

    public void start() {
        thread = new Thread(this);
        thread.start();
    }

    @Override
    public void run() {
        try (MulticastSocket socket = new MulticastSocket(PORT)) {
            String text;

            do {
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                socket.receive(packet);

                byte[] data = packet.getData();
                text = new String(data, 9, packet.getLength());

                StringBuilder address = new StringBuilder();
                for (int i = 0; i < 4; i++) {
                    int part = 0xFF & data[i];
                    if (address.length() > 0) {
                        address.append(".");
                    }
                    address.append(part);
                }

                int timestamp = (data[4] << 24) & 0xff000000 | (data[5] << 16) & 0x00ff0000 | (data[6] << 8) & 0x00ff00 | (data[7] << 0) & 0x000000ff;
                String date = new SimpleDateFormat("dd. MM. yyyy HH:mm:ss").format(new Date((long) timestamp * 1000));

                System.out.println("[" + address + "](" + date + "): " + text);


            } while (!text.equalsIgnoreCase("down"));
        } catch (IOException e) {
            throw new RuntimeException("");
        }
    }

    public void stop() {
        if(thread != null) {
            thread.interrupt();
        }
    }
}
```