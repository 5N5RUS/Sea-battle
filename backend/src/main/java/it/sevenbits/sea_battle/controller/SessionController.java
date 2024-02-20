package it.sevenbits.sea_battle.controller;

import it.sevenbits.sea_battle.entity.Session;
import it.sevenbits.sea_battle.entity.User;
import it.sevenbits.sea_battle.services.SessionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/{id}")
    public String GetSessionData(@PathVariable String id) {
        return "S";
    }

    @PatchMapping("/{id}")
    public void updateSession(
            @PathVariable Long id,
            @ModelAttribute(name = "user") Session session
    ) {
        sessionService.update(id, session);
    }

    @PostMapping
    public void saveSession(
    ) {
        Session session = new Session();
        sessionService.save(session);
    }

    @DeleteMapping("/{id}")
    public void deleteSession(
            @PathVariable Long id
    ) {
        sessionService.remove(id);
    }
}
