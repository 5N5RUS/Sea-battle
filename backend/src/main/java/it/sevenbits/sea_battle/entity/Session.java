package it.sevenbits.sea_battle.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Session")
@Getter
@Setter
public class Session {

    @Id
    private Long ID;

    private Long winner_ID;
    private Long turn_Player_ID;
    private String gameState;
    private Date date;
    @OneToMany (mappedBy = "session")
    List<Cell> cells;
}
